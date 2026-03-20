import React, {useContext, useState} from 'react' 
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'; 
import ProductCard from '../../Components/Product/ProductCard' 
import {useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'; 
import axiosInstance from '../../API/axios' 
import {ClipLoader} from 'react-spinners'
import {db} from '../../Utility/firebase';
import { doc, setDoc } from "firebase/firestore";
import {useNavigate}  from 'react-router-dom';


function Payment() { 
  const [{user, basket}] = useContext(DataContext); 
  console.log(user); 
  const totalItem = basket?.reduce((amount, item)=>{ 
    return item.amount + amount }, 0);
     const total = basket.reduce((amount, item )=>{ 
      return item.price * item.amount + amount ; },0);

     const [cardError, setCardError] = useState(null);
     const [processing, setprocessing]=useState(false); 
     const stripe = useStripe(); 
     const elements = useElements(); 
		 const navigate = useNavigate();

     const handleChange = (e)=>{
       console.log(e); 
       setCardError(e?.error?.message || "");
       }; 
       const handlePayment = async(e) => {
         e.preventDefault(); 
         try {
           setprocessing(true); 
           //1. backend || functions ---> contact the client secret 
           const response = await axiosInstance({
             method: "POST", 
             url: `/payment/create?total=${total*100}`, 
            }); 
            console.log(response.data); 
            const clientSecret = response.data?.clientSecret; 
            //2. client side (react side confirmation) 
            const confirmation = await stripe.confirmCardPayment( clientSecret, 
              { 
                payment_method:{
                   card: elements.getElement(CardElement)
                   }, } ); 
                   console.log(confirmation);
             //3.afterconfirmation ---> order firestore database save, clear basket 
              const paymentIntent = confirmation.paymentIntent;
							console.log(paymentIntent);

							await setDoc(
                 doc(db, "users", user.uid, "orders", paymentIntent.id),
                   {
                     basket: basket,
                     amount: paymentIntent.amount,
                     created: paymentIntent.created,
                   }
              );

               setprocessing(false); 
							 navigate("/orders", {state:{msg:"you have placed new order"}})
              } catch(error) { 
                console.log(error);
                 setprocessing(false);
                 }
								}
 return (
      <LayOut> 
          {/* header */}
            <div className={classes.payment_header}>
              Checkout ({totalItem}) items
             </div>
                {/* payment method */}
              <section className={classes.payment}> 
                {/* address */}
              <div className={classes.flex}> 
                <h3>Delivery Address</h3> 
                  <div> 
                      <div>
                        {user?.email}
                      </div> 
                       <div> 123 React Lane</div> 
                       <div>Chicago, IL</div> 
                   </div> 
               </div>
               <hr/> 
           {/* product */} 
           <div className={classes.flex}> 
               <h3>Review items and delivery</h3> 
                <div> 
                  { 
                    basket?.map((item) => <ProductCard key={item.id || index} product={item} flex={true}/>) 
                   }
                 </div> 
             </div> 
             <hr/>
            {/* card form */} 
            <div className={classes.flex}> 
                <h3>Payment methods</h3> 
                 <div className={classes.payment_card_container}> 
                    <div className={classes.payments__details}> 
                 <form action="" onSubmit={handlePayment}> 
                   {/* error */} 
                 {cardError && <small style={{color: "red"}}>{cardError}</small>} 
                 {/* card element*/} 
                 <CardElement onChange={handleChange}/>
                 {/* price */}
                 <div className={classes.payment__price}> 
                    <div> 
                      <span style={{display: "flex", gap: "10px"}}>
                        <p>Total order |</p> 
                         <CurrencyFormat amount={total}/> 
                       </span> 
                     </div> 
                    <button type='submit'>
                       { processing ? ( <div className={classes.loading} > 
                         <ClipLoader color="gray" size={12} /> 
                            <p>Please Wait ... </p> </div> ) : "Pay Now" }
                     </button> 
                  </div> 
               </form> 
            </div> 
          </div>
       </div>
     </section> 
  </LayOut>     
 ) } 
export default Payment;
import React from 'react'
import {useSelector} from 'react-redux'
import './style.css'
import Card from '../../components/Ui/Card'
import Layout from '../../components/Layout'
const CartPage = (props) => {
    const cart =useSelector(state=>state.cart);
    const cartItems=cart.cartItems;
    return(
        <Layout>
            <div className='cartConatiner'>
                <Card
                headerLeft={`My Cart`}
                headerRight={<div> Deliver to</div>}
                >
                    {
                        Object.keys(cartItems).map((key,index)=>
                        <div key={index} className='flexrow'>
                        <div className='cartProductContainer'>
                            <img src=''/>
                        </div>
                        <div className='cartItemDetails'>
                            <div>
                               {cartItems[key].name} -qty -{cartItems[key].qty}
                            </div>
                            <div>
                                delevery in 3-5 days
                            </div>
                        </div>
                    </div>
                        )
                    }
                    
                </Card>
                <Card 
                style={{width:'500px'}}
                >price</Card>
            </div>
        </Layout>
    )
}
export default CartPage;


import {Fragment, useContext, useEffect, useState } from 'react'
import AdminView from './AdminView'
import ProductCard from './../components/ProductCard'
import UserContext from './../UserContext'
const admin = localStorage.getItem('admin')
const token = localStorage.getItem('token')

export default function Product(){

	const { state, dispatch } = useContext(UserContext)
	console.log(state)

	const [products, setProducts] = useState([])

	useEffect( () => {
		if(admin === "false"){
			fetch(`http://localhost:3009/api/products/isActive`, {
				method: "GET",
				headers:{
					"Authorization": `Bearer ${token}`
				}
			})
			.then(response => response.json())
			.then(response => {

				if(token !== null){
					dispatch({type: "USER", payload: true})
				}
				
				setProducts(
					response.map(product => {
						// console.log(course)
						return <ProductCard key={product._id} productProp={product}/>
					})
				)
			})
		}

	}, [])

	return(
		<Fragment>
			{
				admin === "false" ?
					<Fragment>
						{products}
					</Fragment>
				:
					<Fragment>
						<AdminView />
					</Fragment>
			}
		</Fragment>
	)
}
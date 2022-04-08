import { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import UserContext from './../UserContext'

const token = localStorage.getItem('token')

export default function CreateCourse(){

	const [productName, setProductName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)

	const navigate = useNavigate()

	const { dispatch } = useContext(UserContext)


	useEffect(() => {
		if(token !== null){

			dispatch({type: "USER", payload: true})
		}
	}, [])


	const handleSubmit = (e) => {
		e.preventDefault()

		fetch('http://localhost:3009/api/products/create',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productName: productName,
				description: description,
				price: price
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)
			if(response){

				alert('Product successfully added!')

				navigate('/products')
			}
		})
	}

	return(
		<Container className="container m-5">
		 	<h1 className="text-center">Add Product</h1>
			<Form onSubmit={ (e) => handleSubmit(e) }>
				<Row>
					<Col xs={12} md={8}>
						<Form.Group className="mb-3">
					    	<Form.Control
					    		placeholder="Product Name"
					    		type="text" 
					    		value={productName}
					    		onChange={ (e) => setProductName(e.target.value) }
					    		
					    	/>
						</Form.Group>
					</Col>
					<Col xs={12}  md={4}>
						<Form.Group className="mb-3">
					    	<Form.Control
					    		placeholder="Product Price"
					    		type="number" 
					    		value={price}
					    		onChange={ (e) => setPrice(e.target.value) }
					    	/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12}  md={12}>
						<Form.Group className="mb-3">
					    	<Form.Control
					    		placeholder="Product Description"
					    		type="text" 
					    		value={description}
					    		onChange={ (e) => setDescription(e.target.value) }
					    		
					    	/>
						</Form.Group>
					</Col>
				</Row>
				<Button type="submit" className="btn btn-info btn-block">Add Product</Button>
			</Form>
		</Container>
	)
}
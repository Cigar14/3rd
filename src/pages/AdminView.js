
import { useEffect, useState, Fragment, useContext } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserContext from './../UserContext'

export default function AdminView() {

	const [allProducts, setAllProducts] = useState([])

	const { dispatch } = useContext(UserContext)

	const fetchData = () => {
		fetch(`http://localhost:3009/api/products/`, {
			method: "GET",
			headers:{
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			dispatch({type: "USER", payload: true})

			setAllProducts( response.map(product => {

				return(
					<tr key={product._id}>
						<td>{product._id}</td>
						<td>{product.productName}</td>
						<td>{product.price}</td>
						<td>{product.isActive ? "Active" : "Inactive"}</td>
						<td>
							{
								product.isActive ?
									<Button 
										className="btn btn-danger mx-2"
										onClick={ () => handleArchive(product._id) }
									>
										Archive
									</Button>
								:
									<Fragment>
										<Button 
											className="btn btn-success mx-2"
											onClick={ () => handleUnarchive(product._id)}
										>
												Unarchive
										</Button>
										<Button 
											className="btn btn-secondary mx-2"
											onClick={ () => handleDelete(product._id) }
										>
											Delete
										</Button>
									</Fragment>
							}
						</td>
					</tr>
				)
			}))
		})
	}

	useEffect(() => {
		fetchData()

	}, [])

	const handleArchive = (productId) =>{
		fetch(`http://localhost:3009/api/products/${productId}/archive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				fetchData()

				alert('Product successfully archived!')
			}
		})
	}

	const handleUnarchive = (productId) =>{
		fetch(`http://localhost:3009/api/products/${productId}/unarchive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				fetchData()
				
				alert('Product successfully Unarchived!')
			}
		})
	}

	const handleDelete = (productId) =>{
		fetch(`http://localhost:3009/api/products/${productId}/delete-Product`, {
			method: "DELETE",
			headers:{
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				fetchData()
				
				alert('Product successfully Deleted!')
			}
		})
	}

	return(
		<Container className="container">
			<h1 className="my-5 text-center text-light">Products Lists</h1>
			<div className="text-right">
				<Link className="btn btn-info m-2 text-light" to={`/addProduct`}>Add Product</Link>
				<Link className="btn btn-info m-2 text-light" to={`/access`}>User Dashboard</Link>
			</div>
			<Table>
				<thead>
					<tr>
						<th className="text-light">ID</th>
						<th className="text-light">Product Name</th>
						<th className="text-light">Price</th>
						<th className="text-light">Status</th>
						<th className="text-light">Actions</th>
					</tr>
				</thead>
				<tbody>
					{ allProducts }
				</tbody>
			</Table>
		</Container>
	)
}
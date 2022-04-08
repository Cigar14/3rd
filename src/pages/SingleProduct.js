import { useContext, useEffect, useState } from 'react'
import UserContext from './../UserContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
const token = localStorage.getItem('token')
// console.log(typeof token)
export default function SingleCourse(){

	const { dispatch } = useContext(UserContext)

	const { productId } = useParams()
	console.log(productId)

	const navigate = useNavigate()


	const [productName, setCourseName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)


	const fetchCourses = () => {
		fetch(`http://localhost:3009/api/products/${productId}`, {
			method: "GET",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			setCourseName(response.productName)
			setDescription(response.description)
			setPrice(response.price)
		})
	}

	useEffect(() => {
		if(token !== null){
			dispatch({type: "USER", payload: true})
		}

		fetchCourses()

	}, [])

	const handleEnroll = (productId) => {
		console.log('enroll')

		//sending a request to enroll requires courseId
		fetch(`http://localhost:3009/api/users/enroll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(response => response.json())
		.then( response => {

			if(response){
				alert('Thank you for enrolling to this course!')

				navigate('/products')
			}
		})
	}

	return(
		<Container className="container">
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card className="m-5">
					  <Card.Body>
					    <Card.Title>{productName}</Card.Title>
					    <Card.Subtitle>Description:</Card.Subtitle>
					    <Card.Text>
					      {description}
					    </Card.Text>
					    <Card.Subtitle>Price:</Card.Subtitle>
					    <Card.Text>
					    	{price}
					    </Card.Text>
					    <Button 
					    	className="btn btn-warning"
					    	onClick={ () => handleEnroll(productId) }
					    >Add To Cart</Button>
					  </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}
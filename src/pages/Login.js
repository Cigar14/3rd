import {useState, useEffect, useContext} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UserContext from './../UserContext'

export default function Login(){
	const [email, setEmail] = useState("")
	const [pw, setPW] = useState("")
	const [isDisabled, setIsDisabled] = useState(true)

	const { state, dispatch } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		if(email !== "" && pw !== ""){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, pw])

	const loginUser = (e) => {
		e.preventDefault()

		fetch('http://localhost:3009/api/users/login', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: pw
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				localStorage.setItem('token', response.token)
				const token = localStorage.getItem("token")

				fetch('http://localhost:3009/api/users/profile', {
				      method: "GET",
				      headers:{
				        "Authorization": `Bearer ${token}`
				      }
				    })
				    .then(response => response.json())
				    .then(response => {
				      
				      localStorage.setItem('admin', response.isAdmin)

				      dispatch({type: "USER", payload: true})
				        
				    })

				setEmail("")
				setPW("")

				 navigate('/')

			} else {
				alert('Incorrect credentials!')
			}
		})
	}


	return(
		<Container className="m-5">
		 	<h3 className="text-center text-light">Login</h3>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Form onSubmit={(e) => loginUser(e) }>
						<Form.Group className="mb-3">
							<Form.Label className="text-light">Email address</Form.Label>
					    	<Form.Control 
					    		type="email" 
					    		value={email}
					    		onChange={(e) => setEmail(e.target.value)}
					    	/>
						</Form.Group>

						<Form.Group className="mb-3">
					    	<Form.Label className="text-light">Password</Form.Label>
					    	<Form.Control 
					    		type="password" 
					    		value={pw}
					    		onChange={(e) => setPW(e.target.value)}
					    	/>
						</Form.Group>

						<Button 
							variant="warning" 
							type="submit"
							disabled={isDisabled}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}
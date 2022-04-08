import {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Register(){
	const [fN, setFN] = useState("")
	const [lN, setLN] = useState("")
	const [email, setEmail] = useState("")
	const [pw, setPW] = useState("")
	const [vpw, setVPW] = useState("")
	const [isDisabled, setIsDisabled] = useState(true)

	const navigate = useNavigate();

	// useEffect(function, options)
	useEffect(() => {

		// if all fields are filled out and pw & vpw is equal, change the state to false
		if((fN !== "" && lN !== "" && email !== "" && pw !== "" && vpw !== "") && (pw == vpw)){

			setIsDisabled(false)

		} else {
			//if all input fields are empty, keep the state of the button to true
			setIsDisabled(true)
		}

		//listen to state changes: fn, ln, em, pw, vf
	}, [fN, lN, email, pw, vpw])

	const registerUser = (e) => {
		e.preventDefault()

		fetch('http://localhost:3009/api/users/email-exists', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(response => response.json())
		.then(response => {
			// console.log(response)	//false
			if(!response){
				//send request to register
				fetch('http://localhost:3009/api/users/register', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: fN,
						lastName: lN,
						email: email,
						password: pw
					})
				})
				.then(response => response.json())
				.then(response => {
					// console.log(response)

					if(response){
						alert('Registratiion Successful.')

						//redirect
						navigate('/login')
					} else
					{
						alert('Something went wrong. Please try again')
					}
				})


			} else{
				alert(`User already exists`)
			}
		})
	}

	return(
		<Container className="m-5">
		 	<h3 className="text-center text-light">Register</h3>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Form onSubmit={(e) => registerUser(e) }>
						<Form.Group className="mb-3">
							<Form.Label className="text-light">First Name</Form.Label>
					    	<Form.Control 
					    		type="text" 
					    		value={fN}
					    		onChange={(e) => setFN(e.target.value)}
					    	/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="text-light">Last Name</Form.Label>
					    	<Form.Control 
					    		type="text" 
					    		value={lN}
					    		onChange={(e) => setLN(e.target.value)}
					    	/>
						</Form.Group>

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

						<Form.Group className="mb-3">
					    	<Form.Label className="text-light">Verify Password</Form.Label>
					    	<Form.Control 
					    		type="password" 
					    		value={vpw}
					    		onChange={(e) => setVPW(e.target.value)}
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
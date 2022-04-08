
import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function ProductCard({productProp}) {

	const {productName, description, price, _id} = productProp
	
	return(
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
		    <Link to={`/products/${_id}`}> Check Product </Link>
		  </Card.Body>
		</Card>
	)
}
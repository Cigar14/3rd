
import {Fragment} from "react"
import {Card, Row, Col} from "react-bootstrap"

export default function Highlights(){
	return(

		<Fragment>
			<Row className="m-5">
				<Col xs={12} md={4}>
					<Card>
					  <Card.Body>
					    <Card.Title>Why Buy Our Stick? </Card.Title>
					    <Card.Text>
							Sticks can bring joy to your lonely heart, plus sticks can be use in many different ways depending in your preference just pick the right stick and you're good to go. 
					    </Card.Text>
					  </Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card>
					  <Card.Body>
					    <Card.Title>Perks Of Having A Cool Stick  </Card.Title>
					    <Card.Text>
							You can brag that you have a cool ass stick and make your friends jealous. It can also be your companion in difficult times.Buy our stick and have a title "THE ONE WITH A MIGHTY STICK".
					    </Card.Text>
					  </Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card>
					  <Card.Body>
					    <Card.Title>THE ONE WITH A MIGHTY STICK</Card.Title>
					    <Card.Text>
					      Cool name right?. Though you cannot do anything about it, can't sell it or give it to others. You'll still buy right? RIGGGGHHHTT?? Buy now or you'll regret it for the rest of your life.
					    </Card.Text>
					  </Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	)
}

import {Fragment} from 'react'
import Banner from './../components/Banner'
import Highlights from './../components/Highlights'


export default function Home(){

	// const data = {
	// 	title: "Welcome to Course Booking",
	// 	description: "Opportunities for everyone, everywhere",
	// 	destination: "/courses",
	// 	buttonDesc: "Check Courses"
	// }

	return(
		// render navbar, banner & footer in the webpage via home.js
		<Fragment>
			{/* <Banner bannerProp={data}/> */}
			{<Banner/>}
			<Highlights/>
		</Fragment>
	)
}
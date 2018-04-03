import React, {Component} from "react";
import { Link } from "react-router-dom";
//import Wrapper from "../../Wrapper";
// import Demographics from "../../Demographics";

import API from "../../../utils/API.js"


class DemoForm extends Component {
	state = {
		userId: this.props.userId,
		exists: this.props.exists,
		age: "",
		gender: "",
		education: "",
		income: "", 
		race: "", 
		region: ""
	};
	componentDidMount() {
		console.log( "DemoForm Id: " + this.props.userId);
	};

 	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value});
	};

	handleFormSubmit = event => {
		
		// event.preventDefault();
		if (!this.props.exists && this.props.userName) {
			API.saveUser({
				userId: this.props.userId,
				userName: this.props.userName,
				age: this.state.age,
				gender: this.state.gender,
				education: this.state.education,
				income: this.state.income,
				race: this.state.race,
				region: this.state.region
			})
			.then(res => console.log("Demos stored"))
			.catch(err => console.log(err));
		} else {
			API.updateUser({
				age: this.state.age,
				gender: this.state.gender,
				education: this.state.education,
				income: this.state.income,
				race: this.state.race,
				region: this.state.region
			}, this.userId)
			.then(res => console.log(res))
			.catch(err => console.log(err))
		}
		
	};

	render() {
		return (
			<Wrapper>
				<div className="container">
					<div className="panel panel-success">
						<div className="panel-heading">
							<h3 className="panel-title"><strong>Demographics</strong></h3>
			  
							<p>To allow us to track voting trends please enter your census information below. Information is collectged for data purposes only. Nothing is shared</p>
			
						</div>
			 
						<div className="panel-body"> 
							<form>
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your Age Range from the List Below</label>
									  <select onChange={this.handleChange} name="age" id="inputState" class="form-control">
										  <option selected>Choose ...</option>
										  <option value="16-22">16 - 22</option>
										  <option value="22-34">22 - 34</option>
										  <option value="35-44">35 - 44</option>
										  <option value="45-54">45 - 54</option>
										  <option value="55-64">55 - 64</option>
										  <option value="65+">65 and Older</option>  
										  <option value="pns">Prefer Not to Say</option>     
									  </select>
								</div>
					
					
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your Education Level from the List Below</label>
									  <select onChange={this.handleChange} name="education" id="inputState" class="form-control">
										  <option selected>Choose...</option>
										<option value="hs">Some High School</option>
										<option value="hs+ged">High School Graduate or GED</option>
										<option value="trade">Vocational or Trade School</option>
										<option value="somecollege">Some College</option>
										<option value="undergrad">Undergraduate Degree</option>
										<option value="graddegree">Graduate Degree</option>
										<option value="postgrad">Post Graduate Degree</option>  
										<option value="pns">Prefer Not to Say</option>     
									  </select>
								</div>
					
					
					
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your Ethnicity from the List Below</label>
									  <select onChange={this.handleChange} name="race" id="inputState" class="form-control">
										<option selected>Choose...</option>
										<option value="aian">American Indian or Alaska Native</option>
										  <option value="asian">Asian</option>
										  <option value="black">Black or African American</option>
										  <option value="hispanic">Hispanic or Latino</option>
										  <option value="white">White</option> 
										  <option value="native">Native American or Other Pacific Islander</option>
										  <option value="pns">Prefer Not to Say</option>       
									  </select>
								</div>
					
					
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your Gender from the List Below</label>
									  <select onChange={this.handleChange} name="gender" id="inputState" class="form-control">
										<option selected>Choose...</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="trans">Trans</option>
										<option value="other">Other</option>
										<option value="pns">Prefer Not to Say</option>
									  </select>
								</div>
					
					
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your Income Range from the List Below</label>
									  <select onChange={this.handleChange} name="income" id="inputState" class="form-control">
										<option selected>Choose...</option>
										<option value="1"></option>
										  <option value="2">$9,525 - $38,699</option>
										  <option value="3">$38,700 - $82,499</option>
										  <option value="4">$82,500 - $157,499</option>
										  <option value="5">$157,500 - $199,999</option>
										  <option value="6">$200,000 to $499,999</option>  
										  <option value="7">Over $500,000</option>
										  <option value="pns">Prefer Not To Say</option>    
									  </select>
								</div>
					
								
					
								<div class="form-group col-md-5">
									  <label for="inputState">Select Your State from the List Below</label>
									  <select onChange={this.handleChange} name="region" id="inputState" class="form-control">
										<option selected>Choose...</option>
										<option value="western">Western</option>
										  <option value="midwest">Mid-Western</option>
										  <option value="southern">Southern</option>
										  <option value="northeast">North-Eastern</option>
										  <option value="southeast">South-Eastern</option>
										  <option value="pns">Prefer not to Say</option>
									  </select>
								</div>

								<Link to="/region" >
									<button 
										onClick={ () => {this.handleFormSubmit(); this.props.getUser(this.props.userId)}} 
										id="submitbtn" type="submit" className="btn btn-primary">
										Submit
									</button>
								</Link>
							</form>
				  		</div>
				  	</div>
				</div>
			</Wrapper>	
		)
	}
}


export default DemoForm;

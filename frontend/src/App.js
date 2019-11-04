import React from 'react';
import { Button } from '@material-ui/core'

function login()
{
	fetch('http://localhost:8080/login/becky')
	.then(res => res.json())
	.then(data => {
		localStorage.setItem('token', data.JWT)
		console.log(localStorage.getItem('token'))
	})
}


function getData()
{
	let headers = new Headers({
		'Authorization': localStorage.getItem('token'),
	})
	fetch('http://localhost:8080/test', {
		'headers': headers
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
	})
	.catch(err => {
		console.log(err.toString())
	})
}


export default function App()
{
	return (
		<div className="App">
			<Button onClick={login}>
				Login
			</Button>
			<Button onClick={getData}>
				Get Data
			</Button>
		</div>
	);
}

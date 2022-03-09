import React, { useState, useCallback, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from 'react-moment';
import { list } from '../_services/index'



const useStyles = makeStyles(theme => ({
	padding: {
		padding: '50px'
	},
	media: {
		height: 170
	},
	tableHeader: {
		backgroundColor: '#f2f5f4'
	}
}));

export default function GraspsList() {
	const classes = useStyles();
	const [ graspList, setGraspList ] = useState([]);
	useEffect(() => {
		console.log(1);
		setTimeout(console.log(2), 1000)
		setTimeout(console.log(3), 0)
		console.log(4)
		list().then((data) => {
			if (data.error) {
				values.message = data.error;
				values.severity = 'error';
				handleClick();
			} else {
				setGraspList(data);
			}
			})
	}, []);

	function composeImage(imgData) {
		var image;
		image = Buffer.from(imgData.data);
 
		return image
	}
	
	return (
		<div className={classes.padding}>
			<h2>Grasps List</h2>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Name</TableCell>
							<TableCell className={classes.tableHeader} align="left">Finger Width</TableCell>
							<TableCell className={classes.tableHeader} align="left">Finger Height</TableCell>
							<TableCell className={classes.tableHeader} align="left">Finger Stroke</TableCell>
							<TableCell className={classes.tableHeader} align="left">Grasp Image</TableCell>
							<TableCell className={classes.tableHeader} align="left">Created On</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							graspList.map((grasp, key) => (
								<TableRow key={key}>
									<TableCell component="th" align="left" scope="row">{grasp.name}</TableCell>
									<TableCell align="left">{grasp.fingerWidth}</TableCell>
									<TableCell align="left">{grasp.fingerHeight}</TableCell>
									<TableCell align="left">{grasp.fingerStroke}</TableCell>
									<TableCell align="left">
										{grasp.graspImage &&
											(<img
												className={classes.media}
												src={ `data:image/png;base64, ${composeImage(grasp.graspImage)}` }
											/>)}
									</TableCell>
									<TableCell align="left"><Moment>{grasp.created}</Moment></TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
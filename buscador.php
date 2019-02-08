<?php
	require('./library.php');
	$con = $_GET['all'];
	if($con=='true'){
		echo getAll();
	}else{
		echo filterData($_GET['ciudad'], $_GET['tipo'], $_GET['precio']);
	}
?>
<?php 
	require('./library.php');

	$opc = $_GET['dato'];
	if($opc=='ciudad'){
		echo getCiudades();
	}else{
		echo getTipos();
	}
?>
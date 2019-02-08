<?php
	function getData(){
	    $data_file = fopen("./data-1.json","r");
	    $data_readed = fread($data_file, filesize("./data-1.json"));
	    $data = json_decode($data_readed, true);
	    fclose($data_file);
	    return $data;
	}


	function filterData ($ciudad, $tipo, $precio){
		$list = Array();
		$data = getData();

		$list = array_filter($data, function($val) use ($precio){					
			$monto = toNum($val['Precio']);
			return ($monto > $precio[0] and $monto < $precio[1]);
		});

		if(empty($ciudad) and empty($tipo)){ return json_encode($list); }

		if( !empty($ciudad) xor !empty($tipo) ){
			$list = array_filter($list, function($val) use ($ciudad, $tipo){
						return ($ciudad == $val['Ciudad'] or $tipo == $val['Tipo']);
					});
		}else{
			$list = array_filter($list, function($val) use ($ciudad, $tipo){
						return ($ciudad == $val['Ciudad'] and $tipo == $val['Tipo']);
					});
		}

		return json_encode($list);
	}

	function getAll(){
		return json_encode(getData());
	}

	function getCiudades(){
		$ciudades = Array();
		foreach(getData() as $key => $value) {
			if(!in_array($value['Ciudad'], $ciudades)){
				array_push($ciudades, $value['Ciudad']);			
			}
		}
		return json_encode($ciudades);
	}

	function getTipos(){
		$tipos = Array();
		foreach(getData() as $key => $value) {
			if(!in_array($value['Tipo'], $tipos)){
				array_push($tipos, $value['Tipo']);			
			}
		}
		return json_encode($tipos);
	}

	function toNum($costo){
		$numero = str_replace(['$',','],'',$costo); 
  		//$numero = str_replace(',','',$numero); 
  		return $numero;
	}

?>
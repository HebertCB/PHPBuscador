$(function(){
  setCities(); 
  setTypes();
})

$('#formulario').on('submit', function(event){
  event.preventDefault();
  doSearch();
});

function setCities(){
	$.ajax({
		url:'./general.php',
		type: 'GET',
		dataType: 'json',
		data: {dato:'ciudad'},
		success:function(data){
			let template='';
			$.each(data, function(index, it){
				template += `<option value="${it}">${it}</option>`;				
			});
			$('#selectCiudad').append(template);
		}

	}).done(function(){ $('select').material_select(); })
}

function setTypes(){
	$.ajax({
		url:'./general.php',
		type: 'GET',
		dataType: 'json',
		data: {dato:'tipo'},
		success:function(data){
			let template='';
			$.each(data, function(index, it){
				template += `<option value="${it}">${it}</option>`;				
			});
			$('#selectTipo').append(template);
		}

	}).done(function(){ $('select').material_select(); })
}

$('#mostrarTodos').on('click', function(){
  doSearch(true);
})

function doSearch($all=false){
	$('.colContenido .card:not(.tituloContenido)').remove();

	$ciudad = $('#selectCiudad option:selected').val();
	$tipo = $('#selectTipo option:selected').val();
	$precio = $('#rangoPrecio').val().split(';');

	$.ajax({
		url:'./buscador.php',
		type:'GET',
		dataType: 'json',
		data: {
			all: $all,
			ciudad: $ciudad,
			tipo: $tipo,
			precio: $precio
		},
		success:function(data){
			let template='';
			$.each(data, function(index,it){
				template +=
				`<div class="card" style="display: flex;">
        			<div class="card-image" style="max-width: 50%;">
          				<img src="img/home.jpg">
       				</div>
        			<div style="display: flex;flex-direction: column; flex: 1;">
			          	<div class="card-content" style="flex-grow: 1;">
				            <p>
				              <b>Dirección: </b>${it.Direccion}<br>
				              <b>Ciudad: </b>${it.Ciudad}<br>
				              <b>Teléfono: </b>${it.Telefono}<br>
				              <b>Código postal: </b>${it.Codigo_Postal}<br>
				              <b>Tipo: </b>${it.Tipo}<br>
				              <b>Precio: </b><span style="color: #ff9900; font-size: 1.25em;">${it.Precio}</span>
				        	</p>
			          	</div>
			          	<div class="card-action">
			            	<a href="#">Ver más</a>
			          	</div>
		        	</div>        
		      	</div>`
			});
			$('.colContenido').append(template);			
		},
	}).done(function(){
		var nresul = $('.colContenido .card:not(.tituloContenido)').length;
		if(nresul==0)
			$('.colContenido').append('<div class="card" style="width: 100%;padding: 1em;">No hay resultados</div>');
	})
}


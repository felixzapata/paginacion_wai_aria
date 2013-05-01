var Pagination = function(){

	'use strict';

	var NUM_ELEM_X_PAG = 3, // cuantos elementos por pagina se muestran
		RANGE = 10, // cuantos numeros de paginacion se muestran
		pagina = 0,
		elements, $paginationContent, numElements,
		CLASE_PARA_OCULTAR = 'text-indent',
		CLASE_NEXT = 'siguiente',
		CLASE_PREV = 'anterior',
		CONTENEDOR_PAGINACION = 'C10',
		ID_CONTAINER = 'pag',
		ETIQUETA_PAGINACION = 'pagingLabel',
		CLASE_ELEMENTO_A_PAGINAR = 'paginationItem';



	function getNumPagina(){
		return (pagina !== 0 ) ? (pagina / NUM_ELEM_X_PAG) + 1 : 1;
	}

	function setPagination(){

		var	numPagina = getNumPagina(),
			numPages = Math.ceil(numElements / NUM_ELEM_X_PAG),
			rangeMin, rangeMax, $pagination, pageMin, pageMax;

		$paginationContent.empty();
		if ( numPages > 1 ) {
			createPagination();
            setPaginationEvents();
		}

       function createPagination(){
            rangeMin = (RANGE % 2 === 0) ? (RANGE / 2) - 1 : (RANGE - 1) / 2;
            rangeMax = (RANGE % 2 === 0) ? rangeMin + 1 : rangeMin;
            pageMin = numPagina - rangeMin;
            pageMax = numPagina + rangeMax;
            pageMin = (pageMin < 1) ? 1 : pageMin;
            pageMax = (pageMax < (pageMin + RANGE - 1)) ? pageMin + RANGE - 1 : pageMax;
            if (pageMax > numPages) {
                pageMin = (pageMin > 1) ? numPages - RANGE + 1 : 1;
                pageMax = numPages;
            }
            pageMin = (pageMin < 1) ? 1 : pageMin;
            $pagination = '<p id="' + ETIQUETA_PAGINACION + '" class="' + CLASE_PARA_OCULTAR + '">' + literal.paginacion[6] + '</p>';
            $pagination += '<ul class="unstyled inline" role="toolbar" aria-labelledby="' + ETIQUETA_PAGINACION +'">';
            if (numPagina !== 1) {
                $pagination += '<li class="'+CLASE_PREV+'"><a href="#">'+ literal.paginacion[1] +'</a></li>';
            }

            for ( var i = pageMin; i <= pageMax; i++ ) {
                if ( i === numPagina ) {
					$pagination += '<li><strong><span class="' + CLASE_PARA_OCULTAR + '">'+ literal.paginacion[5] +'</span> ' + i + '</strong></li> ';
                } else {
					$pagination += '<li><a href="" title="' + literal.paginacion[4] + ' ' + i +'">' + i + '</a></li>';
                }
            }
            if (numPagina < numPages) {
                $pagination += '<li class="'+CLASE_NEXT+'"><a href="#">' + literal.paginacion[0] + '</a></li>';
            }
            $pagination += '</ul>';
            
            $paginationContent.append($pagination);
       }

	}

	function hideElements(start){
		var end = start + NUM_ELEM_X_PAG - 1,
			ariaHid = 'aria-hidden', aux;
		elements.show();
		elements.attr(ariaHid, false);
		for(var i = 0; i < numElements; i++){
			if( i < start || i > end){
				aux = elements.eq(i);
				aux.hide();
				aux.attr(ariaHid, true);
			}
		}
	}

	function setPaginationEvents(){
		var next = $paginationContent.find("." + CLASE_NEXT),
			prev = $paginationContent.find("." + CLASE_PREV),
			$pags = $paginationContent.find('li:not([class])'),
			$container = $("#"+ID_CONTAINER);

		$pags.on('click', 'a', function(event){

			event.preventDefault();
			event.stopPropagation();
			var $that = $(this),
				i = parseInt($that.html(), 10);
			pagina = (i - 1) * NUM_ELEM_X_PAG;
			setPagination();
			$container.fadeOut(function(){
				hideElements(pagina);	
			}).fadeIn();
			

		});

		next.on('click', 'a', function(event){
			event.preventDefault();
			event.stopPropagation();
			var numPagina = getNumPagina();
			pagina = numPagina * NUM_ELEM_X_PAG;
			setPagination();
			$container.fadeOut(function(){
				hideElements(pagina);	
			}).fadeIn();

		});

		prev.on('click', 'a', function(event){
			event.preventDefault();
			event.stopPropagation();
			var numPagina = getNumPagina();
			pagina = (numPagina - 2)  * NUM_ELEM_X_PAG;
			setPagination();
			$container.fadeOut(function(){
				hideElements(pagina);	
			}).fadeIn();
		});

	}
	function createContainer(){
		elements.wrapAll('<div id="' + ID_CONTAINER + '" role="region" aria-live="polite"></div>');
	}
	function init(elementsToPage){
		elements = elementsToPage || $('.' + CLASE_ELEMENTO_A_PAGINAR);
		$paginationContent = $('.' + CONTENEDOR_PAGINACION);
		$paginationContent.attr('aria-controls', ID_CONTAINER);
		numElements = elements.length;
		createContainer();
		setPagination();
		hideElements(0);
	}

	return {
		init:init
	};

}();

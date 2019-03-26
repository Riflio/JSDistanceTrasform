$(document).ready(function()
{
	//-- Prepare source image
	var sourceCanvas = document.getElementById("sourceCanvas");
	var scc2d = sourceCanvas.getContext('2d');
	
	//-- Shape
	scc2d.fillStyle = 'rgba(255, 0, 0, 1.0)';
	scc2d.fillRect(50, 50, 150,150);
	
	//-- Prepare canvas for mask
	var maskCanvas = document.getElementById("maskCanvas");	
	
	//-- Prepare canvas for distance transform
	var distanceTransformCanvas = document.getElementById("distanceTransformCanvas"); 
	
	//-- Normalize canvas gradient 0-255
	var normalizeCanvas = document.getElementById("distanceTransformNormalizeCanvas");
	
	//-- height map canvas
	var heightMapCanvas = document.getElementById("heightMapCanvas");
	
	//=============================================================================
	
	mask(sourceCanvas, maskCanvas);
	
	distanceTransform(maskCanvas, distanceTransformCanvas);	
	
	normalizeGradient(distanceTransformCanvas, normalizeCanvas, 73);
	
	height2normal(normalizeCanvas, heightMapCanvas);
	
	
		
	function updateNormalize(size) {
		console.log("Normalize:", size);		
		normalizeGradient(distanceTransformCanvas, normalizeCanvas, size);
		updateHeightMap();
	}
	
	function updateHeightMap() {
		height2normal(normalizeCanvas, heightMapCanvas);
	}
	
	
	$("#sliderNormalize").slider({
		min: 1,
		max: 255,
		value: 73,
		slide: function(event, ui) {
			updateNormalize(ui.value);
		} 
	});
	
});
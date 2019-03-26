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
	
	//-- light canvas
	var lightCanvas = document.getElementById("lightCanvas");
	
	//=============================================================================
	
	mask(sourceCanvas, maskCanvas);
	
	distanceTransform(maskCanvas, distanceTransformCanvas);	
	
	normalizeGradient(distanceTransformCanvas, normalizeCanvas, 73);
	
	height2normal(normalizeCanvas, heightMapCanvas);
	
	var globalLightVector = new Vector(0, 0, 10);
	lighter(heightMapCanvas, sourceCanvas, lightCanvas, globalLightVector);
	
		
	function updateNormalize(size) {
		console.log("Normalize:", size);
		normalizeGradient(distanceTransformCanvas, normalizeCanvas, size);
		updateHeightMap();
	}
	
	function updateHeightMap() {
		height2normal(normalizeCanvas, heightMapCanvas);
		updateLighter(null, null, null);
	}
	
	function updateLighter(x, y, z) {
		if (x!=null) globalLightVector.x = x;
		if (y!=null) globalLightVector.y = y;
		if (z!=null) globalLightVector.z = z;
		lighter(heightMapCanvas, sourceCanvas, lightCanvas, globalLightVector);
	}
	
	$("#sliderNormalize").slider({
		min: 1,
		max: 255,
		value: 73,
		slide: function(event, ui) {
			updateNormalize(ui.value);
		} 
	});
	
	$("#sliderX").slider({
		min: -1000,
		max: 1000,
		value: 0,
		slide: function(event, ui) {
			updateLighter(ui.value, null, null);
		} 
	});
		
	$("#sliderY").slider({
		min: -1000,
		max: 1000,
		value: 0,
		slide: function(event, ui) {			
			updateLighter(null, ui.value, null);
		} 
	});
	
	$("#sliderZ").slider({
		min: 1,
		max: 255,
		value: 10,
		slide: function(event, ui) {			
			updateLighter(null, null, ui.value);
		} 
	});
	
});
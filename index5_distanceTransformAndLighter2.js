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
	
	//-- light canvas
	var lightCanvas = document.getElementById("lightCanvas");
	
	//=============================================================================
	
	mask(sourceCanvas, maskCanvas);
	
	distanceTransform(maskCanvas, distanceTransformCanvas);	
	
	normalizeGradient(distanceTransformCanvas, normalizeCanvas, 73);
		
	var globalLightVector = new Vector(0, 0, 0.005);
	lighter2(normalizeCanvas, sourceCanvas, lightCanvas, globalLightVector);
	
		
	function updateNormalize(size) {
		console.log("Normalize:", size);
		normalizeGradient(distanceTransformCanvas, normalizeCanvas, size);
		updateLighter(null, null, null);
	}

	function updateLighter(angle, elevation, depth) {
		if (angle!=null) globalLightVector.x = radians(angle);
		if (elevation!=null) globalLightVector.y = radians(elevation);
		if (depth!=null) globalLightVector.z = depth/1000;
		lighter2(normalizeCanvas, sourceCanvas, lightCanvas, globalLightVector);
	}
	
	$("#sliderNormalize").slider({
		min: 1,
		max: 255,
		value: 73,
		slide: function(event, ui) {
			updateNormalize(ui.value);
		} 
	});
	
	$("#sliderAngle").slider({
		min: -1000,
		max: 1000,
		value: 0,
		slide: function(event, ui) {
			updateLighter(ui.value, null, null);
		} 
	});
		
	$("#sliderElevation").slider({
		min: -1000,
		max: 1000,
		value: 0,
		slide: function(event, ui) {			
			updateLighter(null, ui.value, null);
		} 
	});
	
	$("#sliderDepth").slider({
		min: 1,
		max: 1000,
		value: 10,
		slide: function(event, ui) {			
			updateLighter(null, null, ui.value);
		} 
	});
	
});
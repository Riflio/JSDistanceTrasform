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
	
	//=============================================================================
	
	mask(sourceCanvas, maskCanvas);
	
	distanceTransformFast(maskCanvas, distanceTransformCanvas);
	
});
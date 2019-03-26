/**
* @brief Light use normal map
* @param bumpCanvas
* @param sourceCanvas
* @param targetCanvas
* @param lightVector
* @returns
*/
function lighter(bumpCanvas, sourceCanvas, targetCanvas, lightVector)
{
  	var bump = bumpCanvas.getContext('2d');
  	var source = sourceCanvas.getContext('2d');
  	var target = targetCanvas.getContext('2d');
	  
	var width = bumpCanvas.width;
  	var height = bumpCanvas.height;
	
	var bmp = bump.getImageData(0, 0, width, height);
	var src = source.getImageData(0, 0, width, height);
	var dst = target.createImageData(width, height);
  
  	var normLightVector = normalize(lightVector);
	
	for (var i=0, l=width*height*4; i<l; i+=4) {
  		var max = 255;
    	var nx = (bmp.data[i] * 2 - max) / max;
		var ny = ((max - bmp.data[i + 1]) * 2 - max) / max;
      	var nz = (bmp.data[i + 2] * 2 - max) / max;
	      
    	var normBumpVector = normalize(new Vector(nx, ny, nz));
  	
    	var a = dot(normLightVector, normBumpVector);
    	
    	if (a<0) a = 0;
    	dst.data[i+0] = src.data[i+0] * a;
    	dst.data[i+1] = src.data[i+1] * a;
    	dst.data[i+2] = src.data[i+2] * a;
    	dst.data[i+3] = src.data[i+3];
  	}
	  
  	target.putImageData(dst, 0, 0);
}
	
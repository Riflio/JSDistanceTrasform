/**
* @brief Light use normal map
* @ref https://blog.saush.com/2011/04/20/edge-detection-with-the-sobel-operator-in-ruby/
* @param bumpMap
* @param target
* @param lightVector
* @returns
*/
function lighter2(heightMap, sourceCanvas, targetCanvas, lightVector)
{
	var hm = heightMap.getContext('2d');
	var src = sourceCanvas.getContext('2d');
	var dst = targetCanvas.getContext('2d');
		
	var z = Math.sin(lightVector.y); 
	var dz = 1.0/lightVector.z;
		
	var lightNormal = new Vector(
		Math.cos(lightVector.y) * -Math.cos(lightVector.x),
		Math.cos(lightVector.y) *  Math.sin(lightVector.x),
		z
	);
		
	var w = heightMap.width;
	var h = heightMap.height;
	
	var prevRowPixels = hm.getImageData(0, 0, w, 1);
	var currentRowPixels = hm.getImageData(0, 1, w, 1);
	
	for (var y=1; y<h-1; ++y) {			
		var nextRowPixels = hm.getImageData(0, y+1, w, 1);
	  	var targetRowPixels = dst.createImageData(w, 1);
	  	var srcRowPixels = src.getImageData(0, y, w, 1);
	  	
		for (var x=1; x<w-1; ++x) {
			//-- Sobel filter	  	        	  	        
			var dx = (
  	      		(prevRowPixels.data[(x+1)*4] + 2.0*currentRowPixels.data[(x+1)*4] + nextRowPixels.data[(x+1)*4])
				-(prevRowPixels.data[(x-1)*4] + 2.0*currentRowPixels.data[(x-1)*4] + nextRowPixels.data[(x-1)*4])
			);
  	      	
  	        var dy = (
				(nextRowPixels.data[(x-1)*4] + 2.0*nextRowPixels.data[x*4] + nextRowPixels.data[(x+1)*4])
				-(prevRowPixels.data[(x-1)*4] + 2.0*prevRowPixels.data[x*4] + prevRowPixels.data[(x+1)*4])
			);

  	        var surfaceNormal = new Vector(dx, dy, dz);
  	        //-- Calculate incident light amount, range [-1, 1]
  	        var a = ((dot(lightNormal, surfaceNormal)/normal(surfaceNormal))-z) / (1-z);
  	        
  	        if (a<0) a = 0;
  	        targetRowPixels.data[x*4+0] = srcRowPixels.data[x*4+0] * a;
  	        targetRowPixels.data[x*4+1] = srcRowPixels.data[x*4+1] * a;
  	        targetRowPixels.data[x*4+2] = srcRowPixels.data[x*4+2] * a;
  	        targetRowPixels.data[x*4+3] = srcRowPixels.data[x*4+3];
		}
			
		dst.putImageData(targetRowPixels, 0, y);			
					
		prevRowPixels = currentRowPixels;
		currentRowPixels = nextRowPixels;
	}
}

/**
* @brief normalize gradient 0-255 
* @param source
* @param target
* @param size
* @returns
*/
function normalizeGradient(source, target, size)
{
	var ctx2d = target.getContext('2d');
	ctx2d.drawImage(source, 0, 0);
	
 	var w = target.width;
	var h = target.height;
		
  	for (var y=0; y<h; ++y) {
		var rowPixels = ctx2d.getImageData(0, y, w, 1);
  		for (var x=0; x<w; ++x) {
  			var newColor = rowPixels.data[x*4+1]*255/size;	  			
			setPixelGrayColor(rowPixels.data, x, newColor);
  		}
  		ctx2d.putImageData(rowPixels, 0, y);
  	}
}

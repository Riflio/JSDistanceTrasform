/**
* @brief Create mask. All transparent pixels to black, another to white 
* @param source canvas
* @param target canvas
* @returns
*/
function mask(source, target)
{
	var src = source.getContext('2d');
	var dst = target.getContext('2d');
	
 	var w = source.width;
	var h = source.height;

  	for (var y=0; y<h; ++y) {
		var srcRowPixels = src.getImageData(0, y, w, 1);
		var dstRowPixels = dst.createImageData(w, 1); 
  		
		for (var x=0; x<w; ++x) {
  			var c = (srcRowPixels.data[x*4+3]==0)? 0 : 255;  			
			setPixelGrayColor(dstRowPixels.data, x, c);
  		}
		
  		dst.putImageData(dstRowPixels, 0, y);
  	}
}
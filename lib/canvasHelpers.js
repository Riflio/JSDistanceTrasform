/**
* @brief Convert rgba color pixel to gray 0-255 
* @ref https://en.wikipedia.org/wiki/Grayscale
* @param pixelsData
* @param offset 
*/
function rgb2gray(pixelsData, offset)
{
	var gamma = 1;
  
  	var pixelStep = offset*4; //-- rgba
   
  	return	0.2126 * Math.pow(pixelsData[pixelStep]	, gamma) + 
  			0.7152 * Math.pow(pixelsData[pixelStep+1], gamma) +
			0.0722 * Math.pow(pixelsData[pixelStep+2], gamma)
	;
}
	
/**
* @brief Set pixel gray color 
* @param pixelsData
* @param offset 
* @param grayValue
*/
function setPixelGrayColor(pixelsData, offset, grayValue)
{
	var pixelSttep = offset*4; //-- rgba
  
	pixelsData[pixelSttep] = grayValue;
	pixelsData[pixelSttep+1] = grayValue;
	pixelsData[pixelSttep+2] = grayValue;
	pixelsData[pixelSttep+3] = 255;
}

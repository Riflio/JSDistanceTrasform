
/**
* @brief Fast calc distance transform
* @ref http://cs.brown.edu/people/pfelzens/dt/
*/
function distanceTransformFast(source, target)
{
	var ctx2d = target.getContext('2d')
			
	ctx2d.drawImage(source, 0, 0);
	
 	var w = target.width;
	var h = target.height;
  
	//-- By cols
	for (var x=0; x<w; ++x) {
		var colPixels = ctx2d.getImageData(x, 0, 1, h);
		var colData = [];
		for (var y=0; y<h; ++y) colData[y] = rgb2gray(colPixels.data, y);    
	    colData = distanceTransform1D(colData);
	    for (var y=0; y<h; ++y) setPixelGrayColor(colPixels.data, y, colData[y]);      
	    ctx2d.putImageData(colPixels, x, 0);
	  }
  
  	//-- By rows
  	for (var y=0; y<h; ++y) {
    	var rowPixels = ctx2d.getImageData(0, y, w, 1);
    	var rowData = [];
    	for (var x=0; x<w; ++x) rowData[x] = rgb2gray(rowPixels.data, x);
    	rowData = distanceTransform1D(rowData);
    	for (var x=0; x<w; ++x) setPixelGrayColor(rowPixels.data, x, rowData[x]);
    	ctx2d.putImageData(rowPixels, 0, y);
  	} 	
}

/**
* @brief Calc distance transform 1D
* @ref http://cs.brown.edu/people/pfelzens/dt/
*/
function distanceTransform1D(dataInput)
{
	var dataOutput = [];
    var n = dataInput.length;

	var k = 0;
    var v = [];
    var z = [];

    v[0] = 0;
    z[0] = Number.NEGATIVE_INFINITY;
    z[1] = Number.POSITIVE_INFINITY;

    var s;

    for (var q = 1; q < n; q++) {
        while (true)  {
            s = (((dataInput[q] + q * q) - (dataInput[v[k]] + v[k] * v[k])) / (2.0 * q - 2.0 * v[k]));
            if (s <= z[k]) { k--; }
            else break;
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = Number.POSITIVE_INFINITY;
    }

    k = 0;

    for (var q = 0; q < n; q++) {
        while (z[k + 1] < q) {
            k++;
        }
        dataOutput[q] = ((q - v[k]) * (q - v[k]) + dataInput[v[k]]);
    }
    
    return dataOutput;
}

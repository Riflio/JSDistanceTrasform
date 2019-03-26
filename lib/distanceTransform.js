/**
* @brief Distance transform algorithm
* @ref https://github.com/adithyaselv/Distance-Transform/blob/master/dt.cpp
* @ref https://www.springer.com/cda/content/document/cda_downloaddocument/9780387312019-c1.pdf
* @ref http://dissertations.ub.rug.nl/FILES/faculties/science/2004/a.meijster/c2.pdf
* @ref https://github.com/parmanoir/Meijster-distance 
* @param source canvas
* @param target canvas
* @returns void
*/
function distanceTransform(source, target)
{
	var sCtx = source.getContext('2d');
	var tCtx = target.getContext('2d');
			
	//ctx2d.drawImage(source, 0, 0);		
	
 	var w = source.width;
	var h = source.height;
	  
	var temp = new Array2Dimm(w*h);
	
	for(var y=0; y<h; ++y) {
		
		var sRowPixels = sCtx.getImageData(0, y, w, 1);
		
		//-- If border is > 0 make it 0 else 255
		if( rgb2gray(sRowPixels.data, 0)<=0 ) {				
			temp.set(0, y, 0);
		} else {
			temp.set(0, y, 255);
		}

		//-- Check for obstacle in the entire row
		//-- Left to right pass
		for(var x=1; x<w; ++x) {
			if( rgb2gray(sRowPixels.data, x)<=0 ) {
				temp.set(x, y, 0);
			} else {
				temp.set(x, y, Math.min(255, 1+temp.get(x-1, y)) );
            }
		}
		//-- Right to left pass
		for(var x=w-2; x>=0; --x) {
			if ( temp.get(x+1,y)<temp.get(x, y) ) {
				temp.set(x, y, Math.min(255, 1+temp.get(x+1, y)) );
			}
        }
	}

	//-- Second Phase - Compute Distance transform
	 
	var s = []; //-- Lower envelope indices
	var t = []; //-- Same least minimizers
	var q=0;
        
	for (var x=0; x<w; ++x) {
		q=0;
		s[0]=0;
		t[0]=0;
		for (var u=1; u<h; ++u) { //-- Top to bottom scan To compute paritions
			while( q>=0 && (EDT_f(t[q], s[q], temp.get(x, s[q]))>EDT_f(t[q], u, temp.get(x, u))) ) q--;
			if(q<0){
				q=0;
				s[0]=u;
			} else { //-- Finds sub-regions 
				var v = 1 + EDT_sep(s[q], u, temp.get(x, s[q]), temp.get(x, u));
				if( v<h ) {
					q++;
					s[q] = u;
					t[q] = v;
				}
			}
		}
	
		var targetColPixels = tCtx.getImageData(x, 0, 1, h);
		for (var u=h-1; u>=0; --u) { //bottom to top of image to find final DT using lower envelope				
			var d = Math.floor(Math.sqrt(EDT_f(u, s[q], temp.get(x, s[q]))));				
			setPixelGrayColor(targetColPixels.data, u, d);				
			if ( u==t[q] ) q--;
		}
		tCtx.putImageData(targetColPixels, x, 0);
	}		
}


/**
* @brief Euclidean DT F function 
* @param x
* @param i
* @param g_i
* @returns
*/
function EDT_f(x, i, g_i)
{
    return (x-i)*(x-i) + (g_i*g_i);
}

/**
* @brief Euclidean DT SEP function 
* @param i
* @param u
* @param gi
* @param gu
* @returns
*/
function EDT_sep(i, u, gi, gu)
{
    return Math.floor((u*u-i*i + gu*gu-gi*gi)/(2*(u-i)));
}




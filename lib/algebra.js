/*
* @brief 2 dimension array
*/
function Array2Dimm(size)
{
	this._array = [];
	this._size = size;
	
	this.get = function(i, j) {
		return this._array[i*this._size+j];		
	}
	
	this.set = function(i, j, v) {
		this._array[i*this._size+j] = v;
		return v;
	}
}
	
/**
* @brief Create new Vector
* @retrun Vector
*/
function Vector(x, y, z) 
{
	this.x = x || 0;
  	this.y = y || 0;
  	this.z = z || 0;
}
	
/**
* @brief return normal of vector
*/
function normal(vec)
{
	return Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
}
	
/**
* @brief Normalize vectort
* @return Vector
*/
function normalize(vec)
{
	var r = new Vector(vec.x, vec.y, vec.z);
  	var len = normal(vec);
	r.x /= len;
	r.y /= len;
  	r.z /= len;
  	return r;
}
			
/**
* @brief Angle betwen 2 Vectors
* @return
*/
function dot(vec1, vec2)
{
	return (vec1.x*vec2.x + vec1.y*vec2.y + vec1.z* vec2.z);
}
	
/**
* @brief Converts from degrees to radians.
*/
function radians(degrees) 
{
  return degrees*Math.PI/180;
};
	 
/**
* @brief Converts from radians to degrees. 
*/
function degrees(radians) 
{
  return radians*180/Math.PI;
};




(function(){
	var lightbox=function(){
	var myHtml= '<div class="picture_area">'+
				'<img  class="picture" src="G:/前端开发/images/1-4.jpg" >'+
			'<span class="close"></span>'+
				'</div>'+
			'<div class="img_handle">'+
			'<span class="prevButton"></span>'+
					'<span class="nextButton"></span>'+
		'</div>';
	var div = document.createElement('div');
	div.className = 'mask';
	div.innerHTML = myHtml
	document.body.appendChild(div);
	var self=this;
	this.Mask=document.querySelector('.mask');
	this.Picture=document.querySelector('.picture');
	this.Picture_area=document.querySelector('.picture_area');
	this.Close=document.querySelector('.close');
	this.Prev=document.querySelector('.prevButton');
	this.Next=document.querySelector('.nextButton');
	this.Index=0;
	this.Group;
	this.lightImgs=document.querySelectorAll('.lightImg');
	this.arraylightImgs=Array.prototype.slice.call (this.lightImgs);
	console.log(123)

	this.Mask.addEventListener('click',function(e){
							console.log(e.target);
							if(e.target==self.Picture_area||e.target==self.Close)
							 self.closePic();
							})
	this.arraylightImgs.forEach(function(element) {
   						 element.addEventListener('click',function(){
   						 	console.log(123)
							var source=element.getAttribute("src");
							var elementGroupname=element.getAttribute("data-group");
							
							//获取点击图片相同的组别
							 self.Group=self.getGroupByAttribute("data-group",elementGroupname)
							self.Index=self.Group.indexOf(element);
							self.showPic(self.Group[self.Index]);
							// console.log(this.Index);
   						   })
   						})				
	this.Prev.addEventListener('click',function(){
							document.onselectstart=function(){
							return false;
						}
						//防止按得过快，变蓝屏；
							if(self.Index==0)
								return;
							else
							self.Index--;
							self.showPic(self.Group[self.Index])
						})
	this.Next.addEventListener('click',function(){
						document.onselectstart=function(){
							return false;
						}
						if(self.Index==self.Group.length-1)
							return;
						else
						self.Index++;
						self.showPic(self.Group[self.Index])
					})

	}
	lightbox.prototype = {
				closePic:function ()
						{
							this.Mask.style.display="none";
						},
				 showPic:function(whichpic)
						{
							var source=whichpic.getAttribute('src');
							this.Picture.setAttribute('src',source);
							this.Mask.style.display="block";
						},
				getGroupByAttribute:function(Attribute,Groupname)
					{
						var nodeList=document.getElementsByTagName('*');
						var nodeArray=[];
						var i=0;
						var node=null;
						while(node=nodeList[i++]){
							if(node.hasAttribute(Attribute)&&node.getAttribute(Attribute)==Groupname)
								nodeArray.push(node);
						}
						return nodeArray;
					}
	}
	window['Lightbox']=lightbox;
})()
<template>
<div class="city_body">
		<div class="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
						<li v-for="item in hotList" :key="item.id">{{item.nm}}</li> 
				</ul>
				</div>
				<div class="city_sort" ref="city_sort">
					<div v-for="(value,key,index) in cityList" :key="index.id">
						<h2>{{key}}</h2>
						<ul>
							<li v-for="item in value" :key="item.id">{{item.nm}}</li>
						</ul>
					</div>
					
				</div>
				</div>
				<div class="city_index">
					<ul>
						<li v-for="(value,key,index) in cityList" :key="index.index" @touchstart="handleToIndex(index)">{{key}}</li>
					</ul>
				</div>
		</div>
</template>

<script>
export default {
	name: 'City',
	data(){
		return{
			hotList:[],
			cityList:{}
		}
	},
	mounted(){
		this.axios.get('/maps.json').then((res)=>{
			var mov = res.movieIds;
			var data = res.data.letterMap;
			this.cityList = data;
			// console.log(this.cityList);
			this.hotList = this.formatCityList(data);
			// console.log(this.hotList);
		});	
		
	},
	methods: {
			handleToIndex(index){
				var h2 = this.$refs.city_sort.getElementsByTagName('h2');
				console.log(h2);
				console.log(h2[index].offsetTop);
				this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
			 },
			formatCityList(cities){
				for(var y=0;y<26;y++){/** 找出热门城市**/
					var s = String.fromCharCode(65+y);
					if(cities[s]===undefined){/**没有此字母开头的城市，跳到下一个 */
						++y;
					}
					s = String.fromCharCode(65+y);
					for(var i = 0;i<cities[s].length;i++){
						if(cities[s][i].isHot==1){
							this.hotList.push(cities[s][i])/*将热门城市保存到数组hotList*/
							// console.log(hotList);
							// console.log(this.hotList);
						}
					 }
				}
				
			},
			
			
		}
		
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
/* .city_body .city_sort{} */
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>

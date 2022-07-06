<template>
    <div class="movie_body" ref="movie_body">
		<Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
				<ul>
					<!-- <li>
						<div class="pic_show"><img src="/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>无名之辈</h2>
							<p>观众评 <span class="grade">9.2</span></p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>今天55家影院放映607场</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li> -->
					<li class="pullDown">{{pullDownMsg}}</li>
					<li v-for="item in movieList" :key="item.id" >
						<div class="pic_show" @tap="handleToDateil"><img :src="item.img | setWH('128.180')"></div>
						<div class="info_list">
							<h2>{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
							<p>观众评 <span class="grade" v-text="item.sc"></span></p>
							<p v-text="item.star"></p>
							<p v-text="item.showInfo"></p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
		</Scroller>
			</div>
</template>

<script>


import { setTimeout } from 'timers';

export default {
	name:'NowPlaying',
	data(){
		return{
			movieList:[],
			pullDownMsg:''
		}
	},
	mounted(){
		this.axios.get('/ajax/movieOnInfoList').then((res)=>{
			var msg = res.total;
			if(!msg){
				this.movieList = res.data.movieList;
				/*this.$nextTick(()=>{
					var scroll = new BScroll(this.$refs.movie_body,{
						tap : true,
						probeType: 1
					});

					scroll.on('scroll',(pos)=>{
						console.log("scroll");
						if(pos.y>30){
							this.pullDownMsg='正在更新中';
						}
					});
					scroll.on('touchEnd',()=>{
						this.axios.get('/ajax/movieOnInfoList').then((res)=>{
							var msg = res.total;
							if(!msg){
								this.pullDownMsg='更新成功';
								setTimeout(()=>{
									this.movieList = res.data.movieList;
									this.pullDownMsg = '';
								},1000)
								
							}
						});
					})
				});*/
			}
		});
	},
	methods:{
		handleToDateil(){
			console.log("sv");
		},
		handleToScroll(pos){
			console.log("handleToScroll");
			if(pos.y>30){
				this.pullDownMsg='正在更新中';
			}
		},
		handleToTouchEnd(){
			this.axios.get('/ajax/movieOnInfoList').then((res)=>{
				var msg = res.total;
				if(!msg){
					this.pullDownMsg='更新成功';
					setTimeout(()=>{
						this.movieList = res.data.movieList;
						this.pullDownMsg = '';
					},1000)
					
				}
			});
		}
	}
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{margin: 0;padding: 0;border: none;}
</style>

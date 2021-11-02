<template>
    <div class="cinema_body">
				<ul>
					<!-- <li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li> -->
					<li v-for="item in cinemaList" :key="item.id">
						<div>
							<span v-text="item.nm"></span>
							<span class="q"><span class="price" v-text="item.sellPrice?item.sellPrice:0"></span> 元起</span>
						</div>
						<div class="address">
							<span class="cinemaAddr" v-text="item.addr"></span>
							<span>{{item.distance}}</span>
						</div>
						<div class="card">
                			<div v-for="(num,key) in item.tag" v-if="num===1" :class="key | classCard" :key="key">{{key | formatCard}}</div>
       					</div>
					</li>
				</ul>
			</div>
</template>

<script>
export default {
	naem:'CiList',
	data(){
		return{
			cinemaList:[]
		}
	},
	mounted() {
		this.axios.get('/ajax/cinemaList?ci=2&limit=10&token').then((res)=>{
			console.log(res);
			this.cinemaList = res.data.cinemas;
		})
	},
	filters:{
		formatCard(key){
			var card = [
				{key:'allowRefund',value:'改签'},
				{key:'endorse',value:'退'},
				{key:'sell',value:'折扣卡'},
				{key:'snack',value:'小吃'},
			];
			for(var i=0;i<card.length;i++){
				if(card[i].key===key){
					return card[i].value;
				}
			}
			return '';
		},
		classCard(key){
			var card = [
				{key:'allowRefund',value:'bl'},
				{key:'endorse',value:'bl'},
				{key:'sell',value:'or'},
				{key:'snack',value:'or'},
			];
			for(var i=0;i<card.length;i++){
				if(card[i].key===key){
					return card[i].value;
				}
			}
			return '';
		}
	}
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .address .cinemaAddr{overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;white-space:nowrap;width:82%; height:24px;display:block;}
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>

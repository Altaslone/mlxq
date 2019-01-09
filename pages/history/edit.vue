<template>
	<view>

		<view class="content" v-for="(item,index) in data" :key="index">
			<view class="top">
				<text class="datetime">{{item.datetime}}</text>
			</view>

			<view class="middle">
				{{item.reason}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: null
			};
		},
		onLoad(option) {
			console.log(option.id);

			uni.showLoading({
				title: '查询中...'
			});

			this.data = [{
				'id': 1,
				'reason': '修改原因',
				'datetime': '2019-01-10 22:00:00'
			}, {
				'id': 2,
				'reason': '修改原因',
				'datetime': '2019-01-10 22:01:00'
			}];

			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}

	.content {
		margin: 10upx 15upx 0upx 15upx;
		background-color: #FFFFFF;

		border-bottom-left-radius: 15upx;
		border-top-right-radius: 15upx;
	}

	.top {
		font-size: 22upx;

		display: flex;
		justify-content: flex-end;

		padding-right: 5upx;
	}

	.middle {
		padding: 5upx;
	}
</style>

<template>
	<view class="content">
		{{detail}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: null
			};
		},
		onLoad(option) {
			console.log(option.id);
			this.detail = uni.getStorageSync('detailContent');
		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}

	.content {
		margin: 10upx;
		background-color: #FFFFFF;

		border-radius: 15upx;
	}
</style>

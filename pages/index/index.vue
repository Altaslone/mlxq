<template>
	<view>

		<view class="content" v-for="(item,index) in data_list" :key="index">

			<view class="top">
				<text class="isWriteOnDay">{{is_day[item.is_day]}}</text>
				<text class="datetime">{{item.ctime}}</text>
			</view>

			<view class="middle" @click="detailClick(item.id,item.content)">
				{{item.content}}
			</view>

			<view class="bottom">
				<view class="dayHistory" @click="shuttleClick(item.id,item.date)">
					{{has_lyt[item.has_lyt]}}
				</view>
				<view class="version" @click="versionClick(item.id,item.version)">
					Ver.{{item.version}}
				</view>
			</view>

		</view>

		<image @click="writeClick()" class="write_png" src="../../static/write.png" mode=""></image>

		<view v-if="nothing" class="nothing">
			Nothing
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data_list: null,
				nothing: true,
				is_day: [' ', '_'],
				has_lyt: ['History', '_History']
			}
		},
		onLoad() {
			uni.showLoading({
				title: '请求中...'
			});

			uni.request({
				url: 'https://caiji.dahang.xyz?s=M.home_list',
				method: 'GET',
				data: {
					'time': '2019-01-16 11:31:00'
				},
				success: res => {
					uni.hideLoading();

					console.log(JSON.stringify(res.data));

					let rd = res.data;
					if (rd.ret == 200) {
						if (rd.data.length) {
							this.data_list = rd.data;
							this.nothing = false;
						} else {
							uni.showToast({
								icon: 'none',
								title: '暂无数据',
								duration: 1500
							});
						}
					} else {
						uni.showModal({
							title: '异常',
							content: rd.msg,
							showCancel: false,
							confirmText: '上报',
							success: function(res) {
								if (res.confirm) {
									console.log(rd.msg);
								}
							}
						});
					}
				},
				fail: () => {
					uni.hideLoading();

					uni.showToast({
						icon: 'none',
						title: '请求异常!',
						mask: false,
						duration: 1500
					});
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		onShow() {

		},
		methods: {
			shuttleClick(id, date) {
				uni.navigateTo({
					url: '/pages/history/index?id=' + id + '&date=' + date
				});
			},
			detailClick(id, content) {
				uni.setStorageSync('detailContent', content);
				uni.navigateTo({
					url: '/pages/history/detail?id=' + id
				});
			},
			versionClick(id, version) {
				if (version > 1) {
					uni.navigateTo({
						url: '/pages/history/edit?id=' + id
					});
				}
			},
			writeClick() {
				uni.navigateTo({
					url: '/pages/history/write'
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}

	.content {
		margin: 10upx 15upx 20upx 15upx;
		background-color: #FFFFFF;

		border-top-left-radius: 15upx;
		border-bottom-right-radius: 15upx;
	}

	.top {
		font-size: 22upx;

		display: flex;
		justify-content: flex-end;
		align-items: flex-end;

		padding-right: 5upx;
	}

	.middle {
		padding: 5upx;

		max-height: 205upx;
		overflow: hidden;
	}

	.bottom {
		color: #E0E0E0;
		font-size: 22upx;

		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		padding-left: 5upx;
		padding-right: 5upx;
	}

	.dayHistory {
		font-size: 30upx;
		color: #D0D0D0;
	}

	.write_png {
		position: fixed;
		bottom: 24upx;
		right: 10upx;

		width: 100upx;
		height: 100upx;
		border-radius: 50upx;

		opacity: 0.8;
	}

	.nothing {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 60%;
	}
</style>

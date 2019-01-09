<template>
	<view>
		<view class="content">

			<view class="top">
				<text class="isWriteOnDay">{{data.isWriteOnDay}}</text>
				<text class="datetime">{{data.datetime}}</text>
			</view>

			<view class="middle" @click="detailClick(data.id,data.content)">
				{{data.content}}
			</view>

			<view class="bottom">
				<view class="dayHistory" @click="shuttleClick(data.id,data.date)">
					{{data.dayHistory}}
				</view>
				<view class="version" @click="shuttleClick(data.id,data.version)">
					Ver.{{data.version}}
				</view>
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
			uni.showLoading({
				title: '加载中。。。'
			});

			console.log(option.id);
			console.log(option.date);
			this.data = {
				'id': 3,
				'date': '2018-01-09',
				'datetime': '2018-01-09 20:22:00',
				'isWriteOnDay': '_',
				'content': '这是一段文字内容 这是一段很长的测试文字内容 有很多个字 默认最大高度是205upx 超出后隐藏 还有没有到需要隐藏的高度 再多写一点字 还是不够 还需要再多写一点字 现在看看够不够了',
				'dayHistory': 'History',
				'version': 2
			};

			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
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
</style>

<template>
	<view>

		<view class="content" v-for="(item,index) in data_list" :key="index">

			<view class="top">
				<text class="isWriteOnDay">{{item.isWriteOnDay}}</text>
				<text class="datetime">{{item.datetime}}</text>
			</view>

			<view class="middle" @click="detailClick(item.id,item.content)">
				{{item.content}}
			</view>

			<view class="bottom">
				<view class="dayHistory" @click="shuttleClick(item.id,item.date)">
					{{item.dayHistory}}
				</view>
				<view class="version" @click="versionClick(item.id,item.version)">
					Ver.{{item.version}}
				</view>
			</view>

		</view>

		<image class="write_png" src="../../static/write.png" mode=""></image>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data_list: null
			}
		},
		onLoad() {
			this.data_list = [{
					'id': 1,
					'date': '2019-01-09',
					'datetime': '2019-01-09 20:22:00',
					'isWriteOnDay': '_',
					'content': '这是一段文字内容',
					'dayHistory': 'History',
					'version': 1
				},
				{
					'id': 2,
					'date': '2019-01-10',
					'datetime': '2019-01-10 20:22:02',
					'isWriteOnDay': '',
					'content': 'this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text ccc测测试 this is a new paragraph of text',
					'dayHistory': '',
					'version': 3
				},
				{
					'id': 3,
					'date': '2019-01-10',
					'datetime': '2019-01-10 20:22:02',
					'isWriteOnDay': '',
					'content': 'this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text zzzz这这是ccc测测试nnnn内内容',
					'dayHistory': 'History',
					'version': 0
				},
				{
					'id': 4,
					'date': '2019-01-10',
					'datetime': '2019-01-10 20:22:02',
					'isWriteOnDay': '_',
					'content': 'this is a new paragraph of text',
					'dayHistory': '',
					'version': 3
				},
				{
					'id': 5,
					'date': '2019-01-10',
					'datetime': '2019-01-10 20:22:02',
					'isWriteOnDay': '',
					'content': 'this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text',
					'dayHistory': '',
					'version': 3
				},
				{
					'id': 6,
					'date': '2019-01-10',
					'datetime': '2019-01-10 20:22:02',
					'isWriteOnDay': '',
					'content': 'this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text this is a new paragraph of text',
					'dayHistory': '',
					'version': 3
				}
			];
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

	.write_png {
		position: fixed;
		bottom: 24upx;
		right: 10upx;

		width: 100upx;
		height: 100upx;
		border-radius: 50upx;

		opacity: 0.8;
	}
</style>

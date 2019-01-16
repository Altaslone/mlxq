<template>
	<view>

		<view class="top">

		</view>

		<view class="middle">
			<textarea class="my_textarea" value="" placeholder="tap to write" placeholder-class="pclass" @blur="bindTextAreaBlur"
			 auto-height></textarea>
		</view>

		<view class="bottom">

			<view class="bottom_left">
				<view class="title">日期:</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="date">{{date}}</view>
				</picker>
			</view>

			<view class="bottom_right">
				<image @click="uploadClick()" class="btn_img" src="../../static/upload.png" mode="aspectFit"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});

			return {
				date: currentDate,
				content: null,
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindTextAreaBlur: function(e) {
				this.content = e.target.value;
				console.log(this.content);
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			uploadClick: function() {
				if (this.content == null || this.content.split(' ').join('').length == 0) {
					uni.showToast({
						icon: 'none',
						title: '填写内容',
						mask: true,
						duration: 1500
					});
				} else {
					uni.showLoading({
						title: '上传中...'
					});

					uni.request({
						url: 'https://caiji.dahang.xyz?s=M.write_one',
						method: 'POST',
						data: {
							date: this.date,
							content: this.content
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							uni.hideLoading();
							console.log(JSON.stringify(res.data));

							let rd = res.data;
							if (rd.ret == 200) {
								if (rd.data.code == 1) {
									uni.showToast({
										icon: 'none',
										title: '同步成功',
										duration: 1000,
										success() {
											uni.navigateTo({
												url: '/pages/index/index'
											});
										}
									});
								} else {
									uni.showModal({
										title: '异常',
										content: rd.data.msg,
										showCancel: false,
										confirmText: '上报',
										success: function(res) {
											if (res.confirm) {
												console.log(rd.data.msg);
											}
										}
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
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 30;
				} else if (type === 'end') {
					year = year + 3;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}

	.top {}

	.middle {
		padding: 15upx;
	}

	.my_textarea {
		background-color: #FFFFFF;

		min-height: 450upx;
		width: 100%;
		border: 1upx solid #F0F0F0;

		font-size: 26upx;
	}

	.pclass {
		font-size: 20upx;
	}

	.title {
		font-size: 26upx;
		color: #303030;
	}

	.date {
		border-bottom: 1upx solid #D0D0D0;
		margin-left: 10upx;
		width: 180upx;
		text-align: center;
		color: #780000;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
	}

	.bottom_left {
		font-size: 26upx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		margin-left: 15upx;
	}

	.bottom_right {}

	.btn_img {
		position: absolute;
		right: 15upx;

		width: 60upx;
		height: 40upx;
	}
</style>

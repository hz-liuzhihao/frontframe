<template>
	<view style="height: 100%;">
		<uni-steps class="step-container" :options="stepList" :active="active"></uni-steps>
		<swiper class="content-swiper">
			<swiper-item>
				<view class="content-item"
					style="background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Flarge%2F0067ukT8gw1f0meib8domj30ku112dhh.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651838416&t=06b13317b69c9e4ad667b6a345f71565);">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content-item"
					style="background-image: url(https://img2.baidu.com/it/u=2847132419,2684747067&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889);">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content-item"
					style="background-image: url(https://img2.baidu.com/it/u=2847132419,2684747067&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889);">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content-item"
					style="background-image: url(https://img2.baidu.com/it/u=1575342051,1714003770&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749);">
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				stepList: [{
					title: '这个产品干啥的？',
				}, {
					title: '你会得到什么？'
				}, {
					title: '你需要做什么？'
				}, {
					title: '加入我们吧'
				}]
			};
		},
		onLoad() {},
		methods: {},
	};
</script>

<style lang="less" scoped>
	.step-container {
		position: absolute;
		left: 0;
		right: 0;
		top: 10rpx;
		margin: 0;
		z-index: 100;
	}

	.content-swiper {
		width: 100%;
		height: 100%;
	}

	.content-item {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
</style>

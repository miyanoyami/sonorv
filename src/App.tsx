import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './App.css'
import 'bulma/css/bulma.css'

function App() {
	// 画像仮置き
	const image1 = "https://pbs.twimg.com/profile_images/1778410657140146176/VE6e5pV6_400x400.jpg"

	function createScoreMatch() {
		return {
			score(attrs: number[], input: number): number {
				if (attrs.includes(input)) {
					return 0
				} else {
					return -1000
				}
			}
		}
	}

	function createScoreNorm(choisesCount: number) {
		return {
			score(attrs: number[], input: number): number {
				let diff: number = attrs[0] - input
				return (-400/(choisesCount * choisesCount)) * (diff * diff)
			}
		}
	}

	function createScoreAdd() {
		return {
			scoreAdd(attrs: number[], input: number): number {
				if (attrs[0] === input) {
					return 100
				} else {
					return 0
				}
			}
		}
	}

	// 質問20題くらい作る
	const questions = [
		// 1
		{
			"q": "どんな声が好き？",
			"as": [
				"渋い",
				"かっこいい",
				"中性的",
				"おしとやか",
				"かわいい",
			],
			"fun": createScoreNorm(5),
		},
		// 2
		{
			"q": "好きな見た目は?",
			"as": [
				"女性",
				"中性的な女性",
				"無性別",
				"中性的な男性",
				"男性",
			],
			"fun": createScoreNorm(5),
		},
		// 3
		{
			"q":"好きなテンションは？",
			"as": [
				"クール",
				"ちょいクール",
				"まちまち",
				"元気",
				"うるさい",
			],
			"fun": createScoreNorm(5),
		},
		// 4
		{
			"q": "新人さんとベテランさんなら?",
			"as": [
				"ド新人",
				"新人",
				"中堅",
				"長め",
				"ベテラン",
			],
			"fun": createScoreNorm(5),
		},
		// 5
		{
			"q":"小さいチャンネルと大きいチャンネルなら？",
			"as": [
				"駆け出し",
				"小さめ",
				"そこそこ",
				"大きめ",
				"大手",
			],
			"fun": createScoreNorm(5),
		},
		// 6
		{
			"q":"見たいコンテンツは?",
			"as": [
				"歌",
				"お絵かき",
				"ゲーム",
				"雑談",
				"TRPG",
				"ホラー",
				"ASMR",
				"企画",
				"その他",
			],
			"fun": createScoreMatch(),
		},
		// 7
		{
			"q":"トーク力とリアクション力、どっちが大事?",
			"as": [
				"トーク力",
				"リアクション力",
			],
			"fun": createScoreAdd(),
		},
		// 8
		{
			"q":"ケモ耳は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 9
		{
			"q":"オッドアイは好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 10
		{
			"q":"眼鏡は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 11
		{
			"q":"和服は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 12
		{
			"q":"ロリ・ショタは好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 13
		{
			"q":"人外は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 14
		{
			"q":"メカは好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 15
		{
			"q":"方言は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 16
		{
			"q":"下ネタは好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 17
		{
			"q":"メカクレは好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},
		// 18
		{
			"q":"お酒飲む人は好き?",
			"as": [
				"すき",
				"そうでもない",
			],
			"fun": createScoreAdd(),
		},

	]

	// 回答保持領域
	const [choises, setChoise] = useState([
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0
	])

	const [answerCount, setAnswerCount] = useState(0)

	// 選択肢記憶
	function handleChoise(q: number, a: number): void {
		const nextChoises = choises.map((choise, i) => {
			// 指定された問題の回答をセット
			if (i === q) {
				return a
			} else {
				// 指定された問題以外は変更しない
				return choise
			}
		})
		setChoise(nextChoises)
		setAnswerCount(answerCount + 1)
	}

	//  VTuber の名前・画像・URL・質問に対応するスコアをセットする
	const vtubers = [
		{"name": "aaa", "icon": image1},
		{"name": "bbb", "icon": image1}
	]

	return (
		<>
		<div>
		<a href="https://react.dev" target="_blank">
		<LazyLoadImage src={reactLogo} className="logo react" alt="React logo" />
		</a>
		</div>
		<h1>そのぶい</h1>

		{
			questions.map(
				(question, i) => {
					if (answerCount == i) {
						return (
							<div className="card fixed-grid">
							<p>【{i+1}問目】</p>
							<p>{question.q}</p>
							{
								question.as.map(
									(a, j) => {
										let buttonClass = `button is-medium is-fullwidth has-text-weight-medium  has-background-primary-${90-j*5}`;
										return (
											<div className="cell m-2">
											<button className={buttonClass} onClick={() =>{
												handleChoise(i,j)
											}
											}>{a}</button>
											</div>
										)}
								)
							}
							</div>
						)
					}
				}
			)

		}

		<div>
		{ answerCount === 18 && <h2>今日のあなたにおすすめのVTuberは......</h2> }
		{
			vtubers.map(
				(vtuber) => { 
					if (answerCount === 18) {
						return (
							<div className="card">
							<a>
							<LazyLoadImage src={vtuber.icon} width="128" height="128" />
							<p>{vtuber.name}</p>
							</a>
							</div>
						) }
				}
			)
		}
		</div>
		<div>
		{ answerCount > 0 &&
			<button className="button is-info is-light" onClick={() => {
			setAnswerCount(answerCount-1)
		}
		}>前の質問に戻る</button>
		}

		<button className="m-4 button is-warning is-light" onClick={() => {
			setChoise([
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,0
			])
			setAnswerCount(0)
		}
		}>最初にもどる</button>
		</div>
		</>
	)
}

export default App

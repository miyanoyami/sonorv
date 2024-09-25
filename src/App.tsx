import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bulma/css/bulma.css';

function App() {
	// 画像仮置き
	const image1 = "https://pbs.twimg.com/profile_images/1778410657140146176/VE6e5pV6_400x400.jpg"

	// 質問を🔟題くらい作る
	const questions = [
		{
			"q": "aですか?",
			"as": [
				"そう",
				"ややそう",
				"どちらともいえない",
				"ややちがう",
				"ちがう",
			]
		},
		{
			"q": "bですか?",
			"as": [
				"そう",
				"ややそう",
				"どちらともいえない",
				"ややちがう",
				"ちがう",
			]
		}
	]

	// 回答保持領域
	const [choises, setChoise] = useState([0,0,0,0,0,0,0,0,0,0])

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
		<img src={reactLogo} className="logo react" alt="React logo" />
		</a>
		</div>
		<h1>VSeek</h1>

		{
			questions.map(
				(question, i) => {
					if (answerCount == i) {
						return (
							<div className="card">
							<p>質問{i}:{question.q}</p>
							{
								question.as.map(
									(a, j) => 
									<button onClick={() =>{
										handleChoise(i,j)
									}
									}>{a}</button>
								)
							}
							<p>えらんだ: {choises[i]} </p>
							</div>
						)
					}
				}
			)

		}

		<div>
		<h2>あなたにおすすめのVTuberは......</h2>
		{
			vtubers.map(
				(vtuber) => { 
					if (answerCount === 2) {
						return (
							<div className="card">
							<a>
							<img src={vtuber.icon} width="128" height="128" />
							<p>{vtuber.name}</p>
							</a>
							</div>
						) }
				}
			)
		}
		</div>
		</>
	)
}

export default App

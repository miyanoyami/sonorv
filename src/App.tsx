import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { VT, VTS } from './types/Vt.ts'
import { question } from './types/question.ts'
import './App.css'
import 'bulma/css/bulma.css'

function App() {
	const iconBasePath = process.env.GITHUB_PAGES ? '/sonorv/dist/icon/' : '/sonorv/icon/'
	const basePath = process.env.GITHUB_PAGES ? '/sonorv/dist/' : '/sonorv/'
	let vts = VTS

	function createScoreMatch() {
		return (attrs: number[], input: number): number => {
			if (attrs.includes(input)) {
				return 0
			} else {
				return -1000
			}
		}
	}

	function createScoreNorm(choisesCount: number) {
		return (attrs: number[], input: number): number => {
			let diff: number = attrs[0] - input
			return (-400/(choisesCount * choisesCount)) * (diff * diff)
		}
	}

	function createScoreAdd() {
		return (attrs: number[], input: number): number => {
			if (attrs[0] === input) {
				return 100
			} else {
				return 0
			}
		}
	}

	// すべてのVTに対して選択済みの回答を通してスコア順を得る
	function show(qs: question[], as: number[]): VT[] {
		vts.map(
			(vt) => {
				vt.score = 0
				vt = setScore(vt, qs, as)
			}
		)
		vts.sort((a, b) => b.score - a.score)
		return [vts[0], vts[1], vts[2], vts[3]]
	}
	function setScore(vt: VT, qs: question[], as: number[]): VT {
		vt.attrsSet.map(
			(attrs, i) => { // attrs: VTの設定値
				let q = qs[i] // 問題定義
				let a = as[i] // 回答内容
				let s = q.fun(attrs, a)
				vt.score += s
			}
		)
		return vt
	}

	// 質問20題くらい作る
	const questions: question[] = [
		// 1
		{
			q: "どんな声が好き？",
			as: [
				"渋い",
				"かっこいい",
				"中性的",
				"おしとやか",
				"かわいい",
			],
			fun: createScoreNorm(5),
		},
		// 2
		{
			q: "好きな見た目は?",
			as: [
				"女性",
				"中性的な女性",
				"無性別",
				"中性的な男性",
				"男性",
			],
			fun: createScoreNorm(5),
		},
		// 3
		{
			q:"好きなテンションは？",
			as: [
				"クール",
				"ちょいクール",
				"まちまち",
				"元気",
				"うるさい",
			],
			fun: createScoreNorm(5),
		},
		// 4
		{
			q:"好きなコメント欄の雰囲気は?",
			as: [
				"こじんまり",
				"のんびり",
				"にぎやか",
				"ガヤガヤ",
			],
			fun: createScoreNorm(4)
		},
		// 5
		{
			q: "新人とベテランなら?",
			as: [
				"ド新人",
				"新人",
				"中堅",
				"長め",
				"ベテラン",
			],
			fun: createScoreNorm(5),
		},
		// 6
		{
			q:"チャンネル規模は？",
			as: [
				"駆け出し",
				"小さめ",
				"そこそこ",
				"大きめ",
				"大手",
			],
			fun: createScoreNorm(5),
		},
		// 7
		{
			q:"見たいコンテンツは?",
			as: [
				"歌",       // 0
				"お絵かき", // 1
				"ゲーム",   // 2 
				"雑談",     // 3
				"TRPG",     // 4
				"ホラー",   // 5
				"ASMR",     // 6
				"企画",     // 7
				"学術",     // 8
				"その他",   // 9
			],
			fun: createScoreMatch(),
		},
		// 8
		{
			q:"トークとリアクションどっちが大事?",
			as: [
				"トーク",
				"リアクション",
			],
			fun: createScoreAdd(),
		},
		// 9
		{
			q:"ケモ耳は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 10
		{
			q:"オッドアイは好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 11
		{
			q:"眼鏡は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 12
		{
			q:"和服は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 13
		{
			q:"ロリ・ショタは好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 14
		{
			q:"人外は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 15
		{
			q:"メカは好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 16
		{
			q:"方言は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 17
		{
			q:"下ネタは好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 18
		{
			q:"目隠れは好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},
		// 19
		{
			q:"お酒飲む人は好き?",
			as: [
				"すき",
				"そうでもない",
			],
			fun: createScoreAdd(),
		},

	]

	// 回答保持領域
	const [choises, setChoise] = useState([
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0
	])

	const [answerCount, setAnswerCount] = useState(-1)

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

	return (
		<>
		<div className="container p-1">
		<div className="container pl-1 pr-1">
		<a href="/">
		<LazyLoadImage src={basePath + "logo.svg"} width="320px" alt="logo"/>
		</a>

		{ answerCount == -1 &&
		<div>
		<p>そのぶいはVリスナーの皆さんの好みを選択してもらうことで</p>
		<p>好みに合うかもしれないVTuberをざっくりオススメするサービスです。</p>
		<p className="is-size-7">※VTuberデータの追加は御本人様から<a href="https://x.com/@miyanoyami83" target="_blank">宮乃やみ</a>までご連絡ください。</p>
		</div>
		}

		{ answerCount == -1 &&
			<button className="m-2 button is-primary is-light" onClick={() => {
			setAnswerCount(0)
		}
		}>はじめる</button>
		}

		{
			questions.map(
				(question, i) => {
					if (answerCount == i) {
						return (
							<div key={i} className="card fixed-grid m-2">
							<p>【{i+1}問目】</p>
							<p className="is-size-5">{question.q}</p>
							{
								question.as.map(
									(a, j) => {
										let buttonClass = `button is-medium is-fullwidth has-text-weight-medium`;
										return (
											<div key={"sub-" + j} className="cell m-1">
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
		{ answerCount === 19 && <h2>おすすめのVTuberは......</h2> }
		{ answerCount === 19 &&
			show(questions, choises).map(
				(vtuber, i) => { 
					if (answerCount === 19) {
						return (
							<a key={i} href={vtuber.yt} target="_blank" className="has-text-black">
							<div className="card mt-2">
							<div className="media">
							<div className="media-left">
							<figure className="image is-96x96">
							<LazyLoadImage className="is-rounded" src={iconBasePath + vtuber.iconFile} />
							</figure>
							</div>

							<div className="media-content">
							<p className="has-text-weight-semibold is-size-5 mt-5">
							{vtuber.name}
							</p>
							</div>
							</div>
							</div>
							</a>
						) }
				}
			)
		}
		</div>
		<div>
		{ answerCount > 0 &&
			<button className="m-2 button is-info is-light" onClick={() => {
			setAnswerCount(answerCount-1)
		}
		}>前の質問に戻る</button>
		}

		{ answerCount > 1 && 
		<button className="m-2 button is-warning is-light" onClick={() => {
			setChoise([
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,0
			])
			setAnswerCount(-1)
		}
		}>最初にもどる</button>
		}
		</div>
		</div>
		</div>
		</>
	)
}

export default App

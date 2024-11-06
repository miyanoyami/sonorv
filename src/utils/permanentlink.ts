import { Liver } from "../types/Liver.ts"
import livers from '../data/vts.json'

export const linkParameterKey: string = 'l'

/** gzipで圧縮する */
async function compress(str: string): Promise<string> {
    const cs = new CompressionStream("gzip")
    const buf = new TextEncoder().encode(str)
    const stream = new Response(buf).body!.pipeThrough(cs)
    const result = await new Response(stream).arrayBuffer()
    // base64はそのままURLで使えないので、一部文字を置き換える
    return btoa(String.fromCharCode(...new Uint8Array(result)))
        .replace(/\+/g, '-')
        .replace(/\\/g, '_')
}

/** gzipの伸張する */
async function decompress(base64: string): Promise<string> {
    const original = atob(base64.replace(/-/g, '+').replace(/_/g, '\\'))
    const buffer = new Uint8Array(original.length)
    for (let index = 0; index < original.length; ++index) {
        buffer[index] = original.charCodeAt(index)
    }
    const ds = new DecompressionStream("gzip")
    const stream = new Blob([buffer]).stream().pipeThrough(ds)
    const buf = await new Response(stream).arrayBuffer()
    return new TextDecoder('utf-8').decode(buf)
}

/** 絶対パスの生成 */
function createUrl(version: number, query: string) {
    return `${location.origin}${location.pathname}?v=${version}&${linkParameterKey}=${query}`
}

/**
 * パーマリンクの生成
 * ※リンクの生成方式が変わることを見越してバージョンを割り振っておく
 */
const v1 = {
    /** パーマリンクを生成する */
    async createLink(livers: Liver[]) {
        const idList = JSON.stringify(livers.map(x => x.yt))
        const parameter = await compress(idList)
        return createUrl(1, parameter)
    },

    /** パーマリンクのsearchからライバーのリストを生成する */
    async getLiverListFromLinkParameter(link: string): Promise<Liver[] | null> {
        try {
            const original = await decompress(link)
            const idList = JSON.parse(original) as string[]
            return idList
                .map(x => livers.find(l => l.yt === x))
                .filter(x => x)
        } catch (e) {
            return null
        }
    }
}

/** パーマリンクを生成する */
export async function createLink(livers: Liver[]): Promise<string> {
    return await v1.createLink(livers)
}

/** パーマリンクからライバーのリストを生成する */
export async function getLiverListFromLink(): Promise<Liver[] | null> {
    const parser = new URLSearchParams(location.search)
    const query = parser.get(linkParameterKey)
    const version = parser.get('v')
    if (!query) { return null }

    switch (version) {
        case "1": return await v1.getLiverListFromLinkParameter(query)
        default: return null
    }
}
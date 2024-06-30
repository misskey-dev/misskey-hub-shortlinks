# Misskey Hub Shortlink Service

Misskey Project関連のページにアクセスしやすくするための短縮リンクページを生成するためのプログラムです。

Bunを使って作成されています（BunのネイティブAPIを使用しているのでNode.jsでは動きません）。

ビルドが速いです。

## Motivation

- リンクが変更になった際に、参照しているプログラム側でリンクを変更する必要がなくなる
- URLを短くできる

## Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run build
```

This project was created using `bun init` in bun v1.1.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## License
MIT

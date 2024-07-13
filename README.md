# Misskey Hub Shortlink Generator

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

This will generate a `dist` directory with the generated html files.

## License
(c) 2024 kakkokari-gtyih and Misskey Project.  
Released under the MIT License.

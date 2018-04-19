import '../assets/styles/footer.styl'

// jsx的使用
export default {
  data() {
    return {
      author: 'LegalHigh'
    }
  },
  render() {
    return (
      
      <div id="footer">
        <span>
          Written by zjy {this.author}
        </span>
      </div>
    )
  }
}
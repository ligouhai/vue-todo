import '../assets/styles/footer.styl'

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
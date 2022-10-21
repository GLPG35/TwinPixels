import '../../scss/footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="copyright">
                <span className='year'>&copy; {new Date().getFullYear()} Gian Luca Porto</span>
            </div>
        </footer>
    )
}

export default Footer
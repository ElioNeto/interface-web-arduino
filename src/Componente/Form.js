<section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="Seu Nome" value={this.state.user.displayName || this.state.user.email} />
                  <input type="hidden" name="email" placeholder="email" value={this.state.user.email} />
                  <input type="text" name="currentItem" placeholder="Comando" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Adicionar</button>
                </form>
              </section>